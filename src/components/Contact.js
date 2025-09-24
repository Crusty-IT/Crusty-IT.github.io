// src/components/Contact.js
import React, { useState, useRef } from "react";
import "./Contact.css";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState({ loading: false, ok: null, text: "" });

  // Użyj własnego endpointu
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xovlyajk";

  const emailOk = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).toLowerCase());

  const validate = (values) => {
    const errors = {};
    if (!values.name.trim()) errors.name = t("contact.errors.name");
    if (!values.email.trim()) errors.email = t("contact.errors.emailRequired");
    else if (!emailOk(values.email)) errors.email = t("contact.errors.emailInvalid");
    if (!values.message.trim()) errors.message = t("contact.errors.message");
    return errors;
  };

  const errors = validate(form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // pokaż błędy dla wszystkich pól
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(errors).length) {
      setStatus({ loading: false, ok: false, text: t("contact.errors.fillAll") });
      return;
    }

    setStatus({ loading: true, ok: null, text: "" });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(formRef.current)
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus({ loading: false, ok: true, text: t("contact.status.ok") });
        setForm({ name: "", email: "", message: "" });
        setTouched({ name: false, email: false, message: false });
      } else {
        setStatus({ loading: false, ok: false, text: data.error || t("contact.status.sendError") });
      }
    } catch {
      setStatus({ loading: false, ok: false, text: t("contact.status.network") });
    }
  };

  const fieldClass = (key) =>
    touched[key] && errors[key] ? "field has-error" : "field";

  return (
    <section className="contact-section" id="contact">
      <div className="contact-card">
        <div className="contact-header">
          <h2>{t("contact.title")}</h2>
          <p className="contact-subtitle">
            {t("contact.subtitle")}
          </p>
        </div>

        <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
          <label className={fieldClass("name")}>
            {t("contact.fields.name")}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t("contact.fields.phName")}
              aria-invalid={touched.name && !!errors.name}
              aria-describedby="err-name"
            />
            {touched.name && errors.name && (
              <span id="err-name" className="error-text" role="alert">
                {errors.name}
              </span>
            )}
          </label>

          <label className={fieldClass("email")}>
            {t("contact.fields.email")}
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t("contact.fields.phEmail")}
              aria-invalid={touched.email && !!errors.email}
              aria-describedby="err-email"
            />
            {touched.email && errors.email && (
              <span id="err-email" className="error-text" role="alert">
                {errors.email}
              </span>
            )}
          </label>

          <label className={fieldClass("message")}>
            {t("contact.fields.message")}
            <textarea
              name="message"
              rows="6"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t("contact.fields.phMessage")}
              aria-invalid={touched.message && !!errors.message}
              aria-describedby="err-message"
            />
            {touched.message && errors.message && (
              <span id="err-message" className="error-text" role="alert">
                {errors.message}
              </span>
            )}
          </label>

          <button type="submit" disabled={status.loading}>
            {status.loading ? t("contact.buttons.sending") : t("contact.buttons.send")}
          </button>
        </form>

        {status.text && (
          <div
            className={`form-status ${status.ok ? "ok" : "error"}`}
            role="status"
            aria-live="polite"
          >
            {status.text}
          </div>
        )}

        <hr className="or-divider" />

        <div className="direct-email-container">
          <p>{t("contact.or")}</p>
          <a href="mailto:crusty.it.office@gmail.com">crusty.it.office@gmail.com</a>
        </div>
      </div>
    </section>
  );
}