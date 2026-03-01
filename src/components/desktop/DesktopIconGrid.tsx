import { getDesktopIcons } from '../../data/fileSystem'
import { DesktopIcon } from './DesktopIcon'

export function DesktopIconGrid() {
  const icons = getDesktopIcons()

  return (
    <div className="h-full p-4" style={{
      display: 'grid',
      gridTemplateRows: 'repeat(auto-fill, 80px)',
      gridAutoFlow: 'column',
      gridAutoColumns: '80px',
      gap: '4px',
      alignContent: 'start',
    }}>
      {icons.map((file) => (
        <DesktopIcon key={file.id} file={file} />
      ))}
    </div>
  )
}
