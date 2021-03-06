import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContentAction,
  addShortImgSrchAction,
} from "../../../store/addImage/actions";
import { getShortImgSrch } from "../../../store/addImage/selectors";
import { getAuthInfo } from "../../../store/authForm/selector";



import style from "./AddBlogForm.module.scss";

const AddBlogForm: FC = () => {
  const [hide, setHide] = useState<any>({ display: "none" });
  const [value, setValue] = useState<any>();
  const dispatch = useDispatch();
  const authOnStore = useSelector(getAuthInfo);

  const author: any = authOnStore ? authOnStore : "Undef";

  let imgSrc = value;
  let blogText = "";

  const thisDate: any = new Date().toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isImage = (imgSrc: any) => {
    imgSrc = imgSrc.split(".");
    return !!(
      imgSrc[imgSrc.length - 1] == "jpg" || imgSrc[imgSrc.length - 1] == "jpeg"
    );
  };
  // используем action
  const toStore = (imgSrc: any, blogText: any, thisDate: any, author: any) => {
    dispatch(addContentAction([{ imgSrc, blogText, thisDate, author }]));
    dispatch(addShortImgSrchAction([{ imgSrc }]));

  };
  // используем селектор
  const onStoreImg = useSelector(getShortImgSrch);
  const imgSrcOnStore = onStoreImg.map((src) => (
    <div
      style={hide}
      onClick={() => {
        setHide({ display: "none" });
        setValue(src.imgSrc);
        imgSrc = value;
      }}>
      {src.imgSrc}
    </div>
  ));

  return (
    <>
      <div className={style.wrapper_search}>
        <div className={style.search_box}>
          <form id={style.data} />

          <p>
            <input
              autoComplete="off"
              type="text"
              placeholder="Адрес изображения"
              value={value}
              name="img"
              onClick={() => {
                setHide({ display: "" });
              }}
              onChange={(e) => {
                imgSrc = e.currentTarget.value;
                setValue(e.currentTarget.value);
                setHide({ display: "none" });
              }}
            />
          </p>
          <div className={`${style.change_box} `} style={hide}>
            {imgSrcOnStore}
          </div>

          <p>
            {" "}
            <textarea
              name="text"
              placeholder="Описание"
              onChange={(e) => {
                blogText =
                  e.currentTarget.value.length > 80
                    ? `${e.currentTarget.value.substr(0, 80)} ... `
                    : e.currentTarget.value;
              }}
            />
          </p>
          <p>
            <button
              onClick={() => {
                if (blogText != "" && imgSrc != "") {
                  if (isImage(imgSrc)) {
                    setValue("");
                    toStore(imgSrc, blogText, thisDate, author);
                  } else {
                    alert("Это не картинка (.jpg,jpeg)");
                  }
                } else {
                  alert("Заполните все поля");
                }
              }}>
              Отправить
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default AddBlogForm;

// let imgSrcOnStore = onStoreImg.map((src)=>(<h4>{src.imgSrc}</h4>))
{
  /* ...................вставка для наглядности....................................... */
}
{
  /* <div style={hide} onClick={() => {
              setHide({ display: "none" });
              setValue("https://img.fonwall.ru/o/cw/vecher-more-poberege-doma.jpg"); imgSrc = value;
            }} >
              https://img.fonwall.ru/o/cw/vecher-more-poberege-doma.jpg</div>
            <div style={hide} onClick={() => {
              setHide({ display: "none" });
              setValue("https://img3.goodfon.ru/wallpaper/nbig/2/66/lake-nature-wallpaper-3358.jpg"); imgSrc = value
            }} >
              https://img3.goodfon.ru/wallpaper/nbig/2/66/lake-nature-wallpaper-3358.jpg</div> */
}
{
  /* .....................конец вставка для наглядности.......................... */
}
