import views from "../../../assets/images/icons/views.png"
import edose from "../../../assets/images/icons/edose.png"
import vaie from "../../../assets/images/icons/vaie.png"

 const cardViews = {
    src : views,
    title: "VIEWS",
    text : "57 active volcanoes",
    background : "linear-gradient(to top, #000000f2 0%, #2c5ca7 100%)",
  }
  const cardEdose = {
    src : edose,
    title: "eDOSE",
    text : "115 Dust clusters detected",
    background : "linear-gradient(to top, #000000f2 0%, #cc0000 100%)",
  }
  const cardVaie = {
    src : vaie,
    title: "...",
    text : "68 X confirmed",
    background : "linear-gradient(to top, #000000f2 0%, #ffc107 100%)",
  }


  export default { cardViews, cardEdose, cardVaie }
