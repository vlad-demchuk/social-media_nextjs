export interface NavItem {
  id: string,
  icon: React.ComponentType<{ className?: string }>,
  label: string,
  href: string
}
