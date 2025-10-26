interface DropdownItem {
    name: string;
    path: string;
  }
  
  interface NavLink {
    name: string;
    path: string;
    dropdown?: DropdownItem[];
  }
  
  export const navLinks: NavLink[] = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'About',
      path: '/about',
    },
    {
      name: 'Services',
      path: '/services',
      dropdown: [
        {
          name: 'General Dentistry',
          path: '/services/general-dentistry',
        },
        {
          name: 'Cosmetic Dentistry',
          path: '/services/cosmetic-dentistry',
        },
        {
          name: 'Dental Implants',
          path: '/services/dental-implants',
        },
        {
          name: 'Orthodontics',
          path: '/services/orthodontics',
        },
        {
          name: 'Pediatric Dentistry',
          path: '/services/pediatric-dentistry',
        },
      ],
    },
    {
      name: 'Portfolio',
      path: '/portfolio',
    },
    {
      name: 'Blog',
      path: '/blog',
    },
    {
      name: 'Contact',
      path: '/contact',
    },
  ];
  
  // Arabic version of navigation
  export const navLinksAr: NavLink[] = [
    {
      name: 'الرئيسية',
      path: '/',
    },
    {
      name: 'من نحن',
      path: '/about',
    },
    {
      name: 'خدماتنا',
      path: '/services',
      dropdown: [
        {
          name: 'طب الأسنان العام',
          path: '/services/general-dentistry',
        },
        {
          name: 'طب الأسنان التجميلي',
          path: '/services/cosmetic-dentistry',
        },
        {
          name: 'زراعة الأسنان',
          path: '/services/dental-implants',
        },
        {
          name: 'تقويم الأسنان',
          path: '/services/orthodontics',
        },
        {
          name: 'طب أسنان الأطفال',
          path: '/services/pediatric-dentistry',
        },
      ],
    },
    {
      name: 'معرض الاعمال',
      path: '/portfolio',
   
    },
    {
      name: 'المدونة',
      path: '/blog',
    },
    {
      name: 'اتصل بنا',
      path: '/contact',
    },
  ];