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
  const now = Date.now();
  const lastTime = lastEventTime[eventName] || 0;
  
  // Check if we should throttle this event type
  if (now - lastTime < THROTTLE_TIME) {
    return;
  }
  
  // Update the last event time
  lastEventTime[eventName] = now;
  
  try {
    // Gather focused user information
    const userInfo = gatherUserInfo();
    
    // Try to get geolocation data (will be null if failed)
    const geoInfo = await getGeolocation();
    
    // Create an enhanced event object
    const enhancedEvent = {
      eventName,
      eventTime: new Date().toISOString(),
      eventParams,
      userInfo,
      geoInfo
    };
    
    // Call the Cloud Function
    try {
      const response = await fetch(FIREBASE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: enhancedEvent
        })
      });
      
      if (!response.ok) {
        console.error('Error calling Firebase function:', await response.text());
      }
    } catch (fnError) {
      console.error('Error calling Firebase function:', fnError);
    }
  } catch (error) {
    console.error('Error sending enhanced Telegram notification:', error);
  }
};

/**
 * Tracks page view and sends notification
 * @param {string} pageName - Name of the page being viewed
 */
const trackPageView = (pageName) => {
  const eventParams = {
    page_title: pageName,
    page_location: window.location.href,
    page_path: window.location.pathname
  };
  
  // Notify Telegram with the full path
  notifyEvent('Page View', { page: pageName });
};

// Export the functions
window.compassTelegramNotifier = {
  notifyEvent,
  trackPageView
};

// Track the current page view on load
document.addEventListener('DOMContentLoaded', () => {
  // Get page title
  const pageTitle = document.title;
  
  // Track the page view
  trackPageView(pageTitle);
});
