/**
 * Telegram notifier utility for CompassOverlay
 * Sends notification messages to a Telegram channel via Firebase Function
 */

// Throttle notifications to avoid spamming
let lastEventTime = {};
const THROTTLE_TIME = 1000; // 1 second in milliseconds

// Firebase function URL - replace with your actual function URL in production
const FIREBASE_FUNCTION_URL = 'https://asia-southeast1-livebandtoday.cloudfunctions.net/sendCompassOverlayTelegramNotification';

/**
 * Gathers focused user and session information
 * @returns Object containing user and session data
 */
const gatherUserInfo = () => {
  try {
    // Get referrer information
    const referrer = document.referrer || 'direct';
    const referrerDomain = referrer !== 'direct' ? new URL(referrer).hostname : 'direct';
    
    // Get user agent information for device detection
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);
    
    // Determine device type
    let deviceType = 'desktop';
    if (isMobile) deviceType = 'mobile';
    if (isTablet) deviceType = 'tablet';
    
    // Get screen dimensions
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    
    return {
      // Referral information
      referrer: referrerDomain,
      isDirectVisit: referrer === 'direct',
      
      // Device information
      deviceType,
      
      // Screen info
      screenSize: `${screenWidth}x${screenHeight}`
    };
  } catch (error) {
    // Fail silently with minimal info
    return {
      error: "Could not gather user info"
    };
  }
};

/**
 * Attempts to get approximate geolocation data using a free API
 * This is optional and will silently fail if the API is unavailable
 * @returns Promise that resolves to a geolocation object or null
 */
const getGeolocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) return null;
    
    const data = await response.json();
    return {
      city: data.city
    };
  } catch (error) {
    return null;
  }
};

/**
 * Sends an enhanced event notification to Telegram if not throttled
 * Includes focused user and session information
 */
const notifyEvent = async (
  eventName, 
  eventParams = {}
) => {
  // Silent fail if we're not in browser environment
  if (typeof window === 'undefined' || !navigator) {
    return;
  }

  const now = Date.now();
  const lastTime = lastEventTime[eventName] || 0;
  
  // Check if we should throttle this event type
  if (now - lastTime < THROTTLE_TIME) {
    return;
  }
  
  // Update the last event time
  lastEventTime[eventName] = now;
  
  // Create a simplified event object to start with
  let eventObject = {
    eventName,
    eventTime: new Date().toISOString(),
    eventParams,
    userInfo: null,
    geoInfo: null
  };
  
  try {
    // Try to add enriched data, but continue even if it fails
    try {
      eventObject.userInfo = gatherUserInfo();
    } catch (e) {
      // Silent fail - the basic event will still be sent
    }
    
    // Try to get geolocation, but continue even if it fails
    try {
      eventObject.geoInfo = await getGeolocation();
    } catch (e) {
      // Silent fail - the basic event will still be sent
    }
    
    // Call the Firebase function directly via HTTP
    try {
      const response = await fetch(FIREBASE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        },
        body: JSON.stringify(eventObject)
      });
      
      // If there's an error, log it but don't show to user
      if (!response.ok) {
        console.warn('Telegram notification failed (non-critical)');
      }
    } catch (fnError) {
      // Silent fail - this is a non-critical feature
      console.warn('Failed to send analytics (non-critical)');
    }
  } catch (error) {
    // Silent fail for all errors - this should never block the user experience
  }
};

/**
 * Tracks page view and sends notification
 * @param {string} pageName - Name of the page being viewed
 */
const trackPageView = (pageName) => {
  // Silent fail if we're not in browser environment
  if (typeof window === 'undefined') return;
  
  const eventParams = {
    page_title: pageName || document.title,
    page_location: window.location.href,
    page_path: window.location.pathname
  };
  
  // Notify Telegram with the full path
  notifyEvent('Page View', eventParams);
};

/**
 * Tracks download button clicks
 * @param {string} platform - The platform (iOS/Android)
 * @param {string} location - Where the button was clicked (hero, footer, etc.)
 */
const trackDownloadClick = (platform, location) => {
  // Silent fail if we're not in browser environment
  if (typeof window === 'undefined') return;
  
  const eventParams = {
    platform: platform,
    location: location,
    page: window.location.pathname,
    timestamp: new Date().toISOString()
  };
  
  // Notify Telegram of the download click
  notifyEvent('Download Click', eventParams);
};

// Export the functions
window.compassTelegramNotifier = {
  notifyEvent,
  trackPageView,
  trackDownloadClick
};

// Track the current page view on load
document.addEventListener('DOMContentLoaded', () => {
  // Silent fail if we're not in browser environment
  if (typeof window === 'undefined') return;
  
  // Get page title
  const pageTitle = document.title;
  
  // Track the page view
  trackPageView(pageTitle);
});
