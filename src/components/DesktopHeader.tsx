import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useHeader } from '@/contexts/HeaderContext';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import Logo from '@/components/Logo';

const navVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, staggerChildren: 0.05 }
  }
};

const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.15 } }
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -5, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: 'easeOut' } },
  exit: { opacity: 0, y: -5, scale: 0.95, transition: { duration: 0.1, ease: 'easeIn' } }
};

export const DesktopHeader: React.FC = () => {
  const { showTopHeader, activeDropdown, dropdownRefs, toggleDropdown, isActive, currentNavLinks, scrolled } = useHeader();
  const { isRTL, toggleLanguage, theme, toggleTheme } = useApp();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        'hidden md:block fixed w-full left-0 right-0 z-40 transition-all duration-300',
        scrolled ? 'bg-white dark:bg-dental-black shadow-md' : 'bg-white dark:bg-dental-black',
        'border-b border-gray-100/20 dark:border-gray-800/20'
      )}
      style={{ top: showTopHeader ? '32px' : 0 }}
    >
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => location.pathname === '/' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/')}
            className="flex items-center"
            aria-label={t('homepage')}
          >
            <Logo scrolled={scrolled} isRTL={isRTL} />
          </button>

          {/* Centered Navigation */}
          <motion.nav
            className={cn('flex items-center justify-center gap-6', isRTL ? 'space-x-reverse' : '')}
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            {currentNavLinks.map((link) => (
              <motion.div
                key={link.path}
                ref={(el) => (dropdownRefs.current[link.path] = el)}
                className="relative"
                variants={navItemVariants}
              >
                {link.dropdown ? (
                  <div>
                    <button
                      className={cn(
                        'text-sm font-medium text-dental-black dark:text-dental-light hover:text-dental-gold dark:hover:text-dental-gold transition-colors duration-200 flex items-center',
                        isActive(link.path) && 'text-dental-gold dark:text-dental-gold font-semibold'
                      )}
                      onClick={() => toggleDropdown(link.path)}
                      aria-expanded={activeDropdown === link.path}
                      aria-haspopup="true"
                    >
                      <span className="whitespace-nowrap">{link.name}</span>
                      <ChevronDown className={cn('inline-block h-3.5 w-3.5 ml-1', activeDropdown === link.path && 'rotate-180')} />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === link.path && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={cn(
                            'absolute top-full mt-1.5 rounded-lg bg-white dark:bg-dental-black shadow-lg border border-gray-100/20 dark:border-gray-800/20 z-50 min-w-[160px] max-w-[220px] py-1',
                            isRTL ? 'right-0 text-right' : 'left-0 text-left'
                          )}
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className={cn(
                                'block px-4 py-1.5 text-sm text-dental-black dark:text-dental-light hover:text-dental-gold dark:hover:text-dental-gold hover:bg-gray-50/50 dark:hover:bg-dental-dark/40 transition-colors duration-150 whitespace-nowrap',
                                isActive(item.path) && 'text-dental-gold dark:text-dental-gold font-medium'
                              )}
                              onClick={() => toggleDropdown(null)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={cn(
                      'text-sm font-medium text-dental-black dark:text-dental-light hover:text-dental-gold dark:hover:text-dental-gold transition-colors duration-200 whitespace-nowrap',
                      isActive(link.path) && 'text-dental-gold dark:text-dental-gold font-semibold'
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.nav>

          {/* Action Buttons */}
          <div className={cn('flex items-center gap-2', isRTL ? 'mr-4' : 'ml-4')}>
            <Button
              size="sm"
              className="bg-gradient-to-b from-dental-gold to-dental-darkGold hover:bg-dental-darkGold text-white rounded-lg px-4 py-1.5"
              asChild
            >
              <Link to="/appointment" className="flex items-center gap-1">
                <span className="whitespace-nowrap">{t('bookAppointment')}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};