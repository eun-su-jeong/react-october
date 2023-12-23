import Footer from "./components/common/footer/Footer";
import Header from "./components/common/header/Header";
import Contact from "./components/sub/contact/Contact";
import Department from "./components/sub/department/Department";
import Community from "./components/sub/community/Community";
import Gallery from "./components/sub/gallery/Gallery";
import Members from "./components/sub/members/Members";
import Detail from "./components/sub/youtube/Detail";
import Youtube from "./components/sub/youtube/Youtube";
import { useMedia } from "./components/hooks/useMedia";
import "./styles/Variable.scss";
import "./styles/Global.scss";
import { Route, Switch } from "react-router-dom";
import MainWrap from "./components/main/mainWrap/MainWrap";
import { useState, useEffect } from "react";
import Menu from "./components/common/menu/Menu";
import { useDispatch, useSelector } from "react-redux";
import * as types from "./redux/actionType";

function App() {
  const dispatch = useDispatch();
  useSelector((store) => console.log(store));

  const [IsDark, setIsDark] = useState(false);
  const [IsMenu, setIsMenu] = useState(false);

  useEffect(() => {
    Object.keys(types).forEach((actionType) =>
      dispatch({ type: types[actionType].start })
    );
    //2
    // ["HISTORY", "DEPARTMENT", "YOUTUBE", "FLICKR"].forEach((actionType) =>
    //   dispatch({ type: types[actionType].start })
    // );
    //1
    // dispatch({ type: types.HISTORY.start });
    // dispatch({ type: types.DEPARTMENT.start });
    // dispatch({ type: types.YOUTUBE.start });
    // dispatch({ type: types.FLICKR.start });
  }, [dispatch]);

  return (
    <main className={`wrap ${useMedia()} ${IsDark ? "dark" : ""}`}>
      <Switch>
        <Route exact path="/">
          <Header
            isMain={true}
            IsDark={IsDark}
            setIsDark={setIsDark}
            IsMenu={IsMenu}
            setIsMenu={setIsMenu}
          />
          <MainWrap />
        </Route>
        <Route path="/">
          <Header
            isMain={false}
            IsDark={IsDark}
            setIsDark={setIsDark}
            IsMenu={IsMenu}
            setIsMenu={setIsMenu}
          />
        </Route>
      </Switch>
      <Route path="/department" component={Department} />
      <Route path="/community" component={Community} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/youtube" component={Youtube} />
      <Route path="/members" component={Members} />
      <Route path="/contact" component={Contact} />
      <Route path="/detail/:id" component={Detail} />
      <Footer />
      <Menu IsMenu={IsMenu} setIsMenu={setIsMenu} />
    </main>
  );
}

export default App;
