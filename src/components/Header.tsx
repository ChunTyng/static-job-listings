const Header = () => {
  return (
    <header
      className="w-full h-[20svh] bg-(--color-primary) bg-cover bg-no-repeat
                 bg-[url('./assets/images/bg-header-mobile.svg')]
                 md:bg-[url('./assets/images/bg-header-desktop.svg')]
                 md:h-[10svh]
    "
    ></header>
  );
};
export default Header;
