// utils/fingerprint.ts
import FingerprintJS from '@fingerprintjs/fingerprintjs'

/* eslint-disable  @typescript-eslint/no-explicit-any */
let fpPromise: Promise<any> | null = null;

export const initFingerprint = () => {
    if (!fpPromise) {
        fpPromise = FingerprintJS.load({
            // Optional configuration
            //   monitoring: false, // Disable monitoring for better performance
        });
    }
    return fpPromise;
};

export const generateFingerprint = async (): Promise<string> => {
    try {
        const fp = await initFingerprint();
        const result = await fp.get();

        return result.visitorId;
    } catch (error) {
        console.error('Fingerprint generation failed:', error);
        // Fallback method
        return await generateFallbackFingerprint();
    }
};

// Enhanced fallback method
const generateFallbackFingerprint = async (): Promise<string> => {
    const components = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        new Date().getTimezoneOffset(),
        navigator.platform,
        navigator.cookieEnabled,
        typeof (navigator.doNotTrack) !== 'undefined' ? navigator.doNotTrack : 'unknown',
    ];

    const componentString = components.join('|');
    const encoder = new TextEncoder();
    const data = encoder.encode(componentString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};



// Get additional browser info (open source version)
export const getBrowserInfo = async () => {
    try {
        const fp = await initFingerprint();
        const result = await fp.get();

        // Extract useful components
        const components = result.components;

        return {
            visitorId: result.visitorId,
            userAgent: components.userAgent?.value,
            language: components.language?.value,
            screen: components.screenResolution?.value,
            timezone: components.timezone?.value,
            platform: components.platform?.value,
            canvas: components.canvas?.value,
        };
    } catch (error) {
        console.error('Failed to get browser info:', error);
        return null;
    }
};