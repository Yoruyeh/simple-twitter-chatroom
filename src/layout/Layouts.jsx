export default function Layout({ children, className }) {
    return (
      <div className='container'>
        <div className={`row ${className}`}>{children}</div>
      </div>
    )
  }
  