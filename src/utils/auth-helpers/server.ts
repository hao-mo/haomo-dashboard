'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getErrorRedirect, getStatusRedirect, getURL } from '@/utils/helpers';
import { getSupabaseServerClient } from '@/utils/supabase/server';

import { getAuthTypes } from './settings';

function isValidEmail(email: string) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

export async function redirectToPath(path: string) {
  return redirect(path);
}

export async function signOut(formData: FormData) {
  const pathName = String(formData.get('pathName')).trim();

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return getErrorRedirect(
      pathName,
      'Hmm... Something went wrong.',
      'You could not be signed out.'
    );
  }

  return getStatusRedirect('/signin', 'Bye bye~', 'You are now signed out.');
}

export async function signInWithEmail(formData: FormData) {
  const cookieStore = cookies();
  const callbackURL = getURL('/auth/callback');

  const email = String(formData.get('email')).trim();

  if (!isValidEmail(email)) {
    return getErrorRedirect('/signin/email_signin', 'Invalid email address.', 'Please try again.');
  }

  const supabase = getSupabaseServerClient();
  const options = {
    emailRedirectTo: callbackURL,
    shouldCreateUser: true,
  };

  // If allowPassword is false, do not create a new user
  const { allowPassword } = getAuthTypes();
  if (allowPassword) options.shouldCreateUser = false;
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options,
  });

  if (error) {
    return getErrorRedirect('/signin/email_signin', 'You could not be signed in.', error.message);
  } else if (data) {
    cookieStore.set('preferredSignInView', 'email_signin', { path: '/dashboard' });
    return getStatusRedirect(
      '/signin/email_signin',
      'Success!',
      'Please check your email for a magic link. You may now close this tab.',
      true
    );
  } else {
    return getErrorRedirect(
      '/signin/email_signin',
      'Hmm... Something went wrong.',
      'You could not be signed in.'
    );
  }
}

export async function requestPasswordUpdate(formData: FormData) {
  const callbackURL = getURL('/auth/reset_password');

  // Get form data
  const email = String(formData.get('email')).trim();

  if (!isValidEmail(email)) {
    return getErrorRedirect(
      '/signin/forgot_password',
      'Invalid email address.',
      'Please try again.'
    );
  }

  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: callbackURL,
  });

  if (error) {
    return getErrorRedirect('/signin/forgot_password', error.message, 'Please try again.');
  } else if (data) {
    return getStatusRedirect(
      '/signin/forgot_password',
      'Success!',
      'Please check your email for a password reset link. You may now close this tab.',
      true
    );
  } else {
    return getErrorRedirect(
      '/signin/forgot_password',
      'Hmm... Something went wrong.',
      'Password reset email could not be sent.'
    );
  }
}

export async function signInWithPassword(formData: FormData) {
  const cookieStore = cookies();
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();

  const supabase = getSupabaseServerClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return getErrorRedirect('/signin/password_signin', 'Sign in failed.', error.message);
  } else if (data.user) {
    cookieStore.set('preferredSignInView', 'password_signin', { path: '/dashboard' });
    return getStatusRedirect('/dashboard', 'Success!', 'You are now signed in.');
  } else {
    return getErrorRedirect(
      '/signin/password_signin',
      'Hmm... Something went wrong.',
      'You could not be signed in.'
    );
  }
}

export async function signUp(formData: FormData) {
  const callbackURL = getURL('/auth/callback');

  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();

  if (!isValidEmail(email)) {
    return getErrorRedirect('/signin/signup', 'Invalid email address.', 'Please try again.');
  }

  const supabase = getSupabaseServerClient();
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username: email.split('@')[0] },
      emailRedirectTo: callbackURL,
    },
  });

  if (error) {
    return getErrorRedirect('/signin/signup', 'Sign up failed.', error.message);
  } else if (data.session) {
    return getStatusRedirect('/dashboard', 'Success!', 'You are now signed in.');
  } else if (data.user?.identities && data.user?.identities.length == 0) {
    return getErrorRedirect(
      '/signin/signup',
      'Sign up failed.',
      'There is already an account associated with this email address. Try resetting your password.'
    );
  } else if (data.user) {
    return getStatusRedirect(
      '/signin/signup_email_sent',
      'Success!',
      'Please check your email for a confirmation link. You may now close this tab.'
    );
  } else {
    return getErrorRedirect(
      '/signin/signup',
      'Hmm... Something went wrong.',
      'You could not be signed up.'
    );
  }
}

export async function resetPassword(formData: FormData) {
  const password = String(formData.get('password')).trim();
  const confirmPassword = String(formData.get('confirmPassword')).trim();

  // Check that the password and confirmation match
  if (password !== confirmPassword) {
    return getErrorRedirect(
      '/signin/reset_password',
      'Your password could not be updated.',
      'Passwords do not match.'
    );
  }

  const supabase = getSupabaseServerClient();
  const { error, data } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return getErrorRedirect(
      '/signin/reset_password',
      'Your password could not be updated.',
      error.message
    );
  } else if (data.user) {
    return getStatusRedirect('/dashboard', 'Success!', 'Your password has been updated.');
  } else {
    return getErrorRedirect(
      '/signin/reset_password',
      'Hmm... Something went wrong.',
      'Your password could not be updated.'
    );
  }
}

export async function updateEmail(formData: FormData) {
  // Get form data
  const newEmail = String(formData.get('newEmail')).trim();

  // Check that the email is valid
  if (!isValidEmail(newEmail)) {
    return getErrorRedirect(
      '/account',
      'Your email could not be updated.',
      'Invalid email address.'
    );
  }

  const supabase = getSupabaseServerClient();

  const callbackUrl = getURL(
    getStatusRedirect('/account', 'Success!', `Your email has been updated.`)
  );

  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    {
      emailRedirectTo: callbackUrl,
    }
  );

  if (error) {
    return getErrorRedirect('/account', 'Your email could not be updated.', error.message);
  } else {
    return getStatusRedirect(
      '/account',
      'Confirmation emails sent.',
      `You will need to confirm the update by clicking the links sent to both the old and new email addresses.`
    );
  }
}

export async function updateName(formData: FormData) {
  // Get form data
  const fullName = String(formData.get('fullName')).trim();

  const supabase = getSupabaseServerClient();
  const { error, data } = await supabase.auth.updateUser({
    data: { full_name: fullName },
  });

  if (error) {
    return getErrorRedirect('/account', 'Your name could not be updated.', error.message);
  } else if (data.user) {
    return getStatusRedirect('/account', 'Success!', 'Your name has been updated.');
  } else {
    return getErrorRedirect(
      '/account',
      'Hmm... Something went wrong.',
      'Your name could not be updated.'
    );
  }
}
