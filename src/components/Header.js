import HeaderNavigation from "./HeaderNavigation";
import HeaderSlider from "./HeaderSlider";

const Header = (props) => {
  return (
    <section className="header">
      <HeaderNavigation onOpen={props.onOpen}></HeaderNavigation>
      <HeaderSlider></HeaderSlider>
    </section>
  );
};

export default Header;
