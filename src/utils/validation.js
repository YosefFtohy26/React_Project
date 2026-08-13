const isRequired = (value) => value !== undefined && value !== null && String(value).trim() !== '';

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());

const isPhone = (value) => /^[+]?[\d\s()-]{8,15}$/.test(String(value).trim());

const isMinLength = (value, min) => String(value).trim().length >= min;

export const validateContact = (values) => {
  const errors = {};

  if (!isRequired(values.name)) {
    errors.name = 'contact.error_name_required';
  } else if (!isMinLength(values.name, 3)) {
    errors.name = 'contact.error_name_min';
  }

  if (!isRequired(values.email)) {
    errors.email = 'contact.error_email_required';
  } else if (!isEmail(values.email)) {
    errors.email = 'contact.error_email_invalid';
  }

  if (!isRequired(values.phone)) {
    errors.phone = 'contact.error_phone_required';
  } else if (!isPhone(values.phone)) {
    errors.phone = 'contact.error_phone_invalid';
  }

  if (!isRequired(values.message)) {
    errors.message = 'contact.error_message_required';
  } else if (!isMinLength(values.message, 10)) {
    errors.message = 'contact.error_message_min';
  }

  return errors;
};
