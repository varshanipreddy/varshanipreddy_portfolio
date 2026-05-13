import React from "react";

function EducationCards(props) {
  const { imgPath, title, title2, description, accent } = props;
  const accentKey =
    accent === "tamu" || accent === "nit" ? accent : "default";
  return (
    <article
      className={`edu-degree-card edu-degree-card--${accentKey}`}
      aria-label={typeof title === "string" ? title.replace(/&amp;/g, "&") : undefined}
    >
      <div className="edu-degree-card__inner">
        <div className="edu-degree-card__media">
          <div className="edu-degree-card__logo-frame">
            <img
              src={imgPath}
              alt=""
              className="edu-degree-card__logo"
              loading="lazy"
              decoding="async"
              width={112}
              height={112}
            />
          </div>
        </div>
        <div className="edu-degree-card__body">
          <h3 className="edu-degree-school">{title}</h3>
          <p className="edu-degree-program">{title2}</p>
          {props.title3 ? (
            <p className="edu-degree-extra">{props.title3}</p>
          ) : null}
          <p className="edu-degree-dates">{description}</p>
        </div>
      </div>
    </article>
  );
}

export default EducationCards;
