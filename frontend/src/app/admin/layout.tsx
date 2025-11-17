import AdminWrapper from './components/AdminWrapper';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminWrapper>{children}</AdminWrapper>;
}
