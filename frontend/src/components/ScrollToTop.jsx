import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop – resets the scroll position to the top of the page
 * on every route change with a smooth animation.
 *
 * Place this component inside <BrowserRouter> so it has access
 * to the router context.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
