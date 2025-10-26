import { HeaderProvider } from '@/contexts/HeaderContext';
import { TopBar } from './TopBar';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';

export function Header() {
  return (
    <HeaderProvider>
      {/* TopBar - شريط المعلومات العلوي */}
      <TopBar />
      
      {/* Desktop Header - الهيدر للشاشات الكبيرة */}
      <DesktopHeader />
      
      {/* Mobile Header - الهيدر للشاشات الصغيرة */}
      <MobileHeader />
    </HeaderProvider>
  );
}

export default Header;
