import { Wallpaper } from './Wallpaper'
import { DesktopIconGrid } from './DesktopIconGrid'
import { WindowManager } from '../window/WindowManager'
import { Taskbar } from './Taskbar'
import { CRTOverlay } from '../crt/CRTOverlay'

export function Desktop() {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {/* Main desktop area */}
      <div className="relative flex-1 overflow-hidden">
        <Wallpaper />
        <div className="absolute inset-0" style={{ zIndex: 10 }}>
          <DesktopIconGrid />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
          <WindowManager />
        </div>
      </div>
      <Taskbar />
      <CRTOverlay />
    </div>
  )
}
