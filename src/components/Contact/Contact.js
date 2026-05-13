import React from "react";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Particle from "../Particle";

const FORM_EMAIL = "varshanipreddy@gmail.com";

function thankYouUrl() {
  if (typeof window === "undefined") return "";
  const pub = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
  const pathBase = pub ? `${pub}` : "";
  return `${window.location.origin}${pathBase}/#/contact?sent=1`;
}

function Contact() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sent = searchParams.get("sent") === "1";
  const redirectTo = thankYouUrl();

  const dismissSent = () => {
    searchParams.delete("sent");
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className="contact-page">
      <Particle />
      <Container className="contact-inner px-3 px-md-4">
        <header className="contact-header">
          <p className="contact-eyebrow">Get in touch</p>
          <h1 className="contact-title">
            Contact <span className="contact-title-accent">me</span>
          </h1>
          <p className="contact-lede">
            Fill in your details and message, then click send — you&apos;ll be brought back here
            after it goes through.
          </p>
        </header>

        <div className="contact-form-shell">
          {sent ? (
            <div className="contact-success" role="status">
              <p className="contact-success-title">Thanks — message sent</p>
              <p className="contact-success-text">
                I&apos;ll get back to you at the email you provided. If anything bounces, reach me
                directly at{" "}
                <a href={`mailto:${FORM_EMAIL}`}>{FORM_EMAIL}</a>.
              </p>
              <button type="button" className="contact-success-dismiss" onClick={dismissSent}>
                Send another message
              </button>
            </div>
          ) : (
            <form
              className="contact-form"
              action={`https://formsubmit.co/${encodeURIComponent(FORM_EMAIL)}`}
              method="POST"
            >
              <input type="hidden" name="_subject" value="Message from portfolio contact form" />
              {redirectTo ? <input type="hidden" name="_next" value={redirectTo} /> : null}
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="text"
                name="_gotcha"
                className="contact-honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <label className="contact-field">
                <span className="contact-label">Your name</span>
                <input
                  name="name"
                  type="text"
                  className="contact-input"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>

              <label className="contact-field">
                <span className="contact-label">
                  Your email <span className="contact-required">*</span>
                </span>
                <input
                  name="email"
                  type="email"
                  className="contact-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="contact-field">
                <span className="contact-label">
                  Message <span className="contact-required">*</span>
                </span>
                <textarea
                  name="message"
                  className="contact-textarea"
                  placeholder="Type your message here…"
                  rows={8}
                  required
                />
              </label>

              <button type="submit" className="contact-submit">
                Send message
              </button>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Contact;
