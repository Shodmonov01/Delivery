import "./gam.css";

const Gamburger = () => {
  return (
    <>
     <div id="menuToggle">
  <input id="checkbox" type="checkbox" />
  <label className="toggle" htmlFor="checkbox">
    <div className="bar bar--top" />
    <div className="bar bar--middle" />
    <div className="bar bar--bottom" />
  </label>
</div>

    </>
  );
};

export default Gamburger;
