import { Laptop, Phone, Tablet } from './Devices'

// A project's device, presented on a quiet surface with a slight 3D angle.
export default function Cover({ project, large = false }) {
  const device =
    project.cover === 'lori' ? <Tablet /> :
    project.cover === 'saravoan' ? <Laptop src={project.screenshot} /> :
    <Phone />

  return (
    <div className={`cover cover-${project.cover} ${large ? 'cover-lg' : ''}`}>
      <div className="cover-glow" />
      <div className="cover-dev">{device}</div>
    </div>
  )
}
