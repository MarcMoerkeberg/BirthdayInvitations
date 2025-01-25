import Device from "@/models/componentModels/Devices";

const userAgent: string = navigator.userAgent || navigator.vendor || (window as any).opera || undefined
const isMobileDevice = (): boolean => {
    const regexs = [/(Android)(.+)(Mobile)/i, /BlackBerry/i, /iPhone|iPod/i, /Opera Mini/i, /IEMobile/i]
    return regexs.some((b) => userAgent.match(b))
}

const isTabletDevice = (): boolean => {
    const regex = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/
    return regex.test(userAgent.toLowerCase())
}

export function getCurrentDevice(): Device {
    if (isMobileDevice()) {
        return Device.Mobile
    }
    if (isTabletDevice()) {
        return Device.Tablet
    }

    return Device.Desktop;
}

export function isMobile(): boolean {
    return isMobileDevice() || isTabletDevice()
}