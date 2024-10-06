import { AnimatePresence, motion } from "framer-motion";
import { BiMenu } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";
import { createContext, useContext, useState } from "react";
import { cn } from "../lib/utils";

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({ children, open, setOpen, animate }) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
};

// for desktop view
export const DesktopSidebar = ({ className, children, ...props }) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden  md:flex md:flex-col bg-white border-r border-gray-300 w-[260px] flex-shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "260px" : "70px") : "260px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

// for mobile view
export const MobileSidebar = ({ className, children, ...props }) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-neutral-100 w-auto sticky top-0 z-10"
        )}
        {...props}
      >
        <div className="flex justify-end w-full">
          <div className="text-neutral-800" onClick={() => setOpen(!open)}>
            <BiMenu />
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-[300px] inset-0 bg-white py-6 px-4 z-[100] flex flex-col justify-between shadow-md",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800"
                onClick={() => setOpen(!open)}
              >
                <FaXmark />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// for right sidebar
export const ProfileSidebar = ({ className, children, open, setOpen }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "fixed h-full w-[300px] top-0 right-0 bg-gray-50 border border-gray-300 py-6 px-2 z-[100] flex flex-col justify-between shadow-lg items-end gap-6",
              className
            )}
          >
            <button
              className="text-neutral-800 me-6"
              onClick={() => setOpen(false)}
            >
              <FaXmark size={20} />
            </button>
            {children}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            onClick={() => setOpen(false)}
            className={cn(
              "fixed w-full h-full inset-0 bg-black bg-opacity-30 z-[55]",
              className
            )}
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileSidebar;
