import React from "react";
import { FaAward } from "react-icons/fa";

function AwardsCards({
  imgPath,
  title,
  issuer,
  description,
  variant = "default",
  index = 0,
}) {
  const v =
    variant === "huawei" || variant === "tamu" ? variant : "default";

  return (
    <article
      className={`award-card award-card--${v}`}
      style={{ "--award-stagger": `${index * 90}ms` }}
    >
      <div className="award-card__inner">
        <div className="award-card__media">
          <div className="award-card__logo-frame">
            <img src={imgPath} alt="" className="award-card__logo" loading="lazy" />
          </div>
        </div>
        <div className="award-card__body">
          <div className="award-card__title-row">
            <h2 className="award-card__title">{title}</h2>
            <span className="award-card__badge" aria-hidden title="Award">
              <FaAward />
            </span>
          </div>
          <p className="award-card__issuer">{issuer}</p>
          <p className="award-card__description">{description}</p>
        </div>
      </div>
    </article>
  );
}

export default AwardsCards;
