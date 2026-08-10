import Render from './Render'

export default function Footer() {
  return (
    <footer className="border-t border-hair px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2.5">
          <Render name="logo" sizes="40px" className="h-4 w-auto" alt="" />
          <span className="text-sm font-medium text-fg">Kumiko</span>
        </div>

        <p className="text-xs leading-relaxed text-fg-muted">
          Kumiko Drive is a concept design. Not a shipping product.
        </p>

        <p className="text-xs text-fg-muted">© {new Date().getFullYear()} Kumiko</p>
      </div>
    </footer>
  )
}
