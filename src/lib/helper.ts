type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  logo?: string;
};
// !STARTERCONF This OG is generated from https://github.com/theodorusclarence/og
// Please clone them and self-host if your site is going to be visited by many people.
// Then change the url and the default logo.
export function openGraph({
  siteName,
  templateTitle,
  description,
  // !STARTERCONF Or, you can use my server with your own logo.
  logo = 'https://og.<your-domain>/images/logo.jpg',
}: OpenGraphType): string {
  const ogLogo = encodeURIComponent(logo);
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
  const ogDesc = encodeURIComponent(description.trim());

  return `https://og.<your-domain>/api/general?siteName=${ogSiteName}&description=${ogDesc}&logo=${ogLogo}${
    ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
  }`;
}

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getTrueColor(statusType: string) {
  let statusClass = '';
  switch (statusType) {
    case 'not counseled':
      statusClass = 'bg-red-500 text-white';
      break;
    case 'counseled':
      statusClass = 'bg-cyan-500 text-white';
      break;
    case 'awaiting intakes':
      statusClass = 'bg-orange-500 text-white';
      break;
    case 'closed':
      statusClass = 'bg-black text-white';
      break;
    case 'closing':
      statusClass = 'bg-blue-500 text-white';
      break;
    case 'ongoing':
      statusClass = 'bg-green-500 text-white';
      break;
  }
  return statusClass;
}

export const TABLELABELS = [
  'Status',
  'Assigned Counselor',
  'Client (A - Z)',
  'Date Action Performed',
  'State',
  'Billed',
  'Notes',
  'Actions',
];
