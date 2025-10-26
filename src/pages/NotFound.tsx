
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dental-black/20 px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-9xl font-bold mb-4 text-dental-gold font-playfair">404</h1>
        <p className="text-2xl text-gray-700 dark:text-gray-200 mb-6 font-medium">عفوًا، الصفحة غير موجودة</p>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها، يرجى التحقق من العنوان أو العودة إلى الصفحة الرئيسية.
        </p>
        <Button 
          asChild
          className="bg-dental-gold hover:bg-dental-darkGold text-white transition-all duration-300 flex items-center"
        >
          <Link to="/">
            <Home className="mr-2 rtl:ml-2 h-4 w-4" />
            العودة إلى الصفحة الرئيسية
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
