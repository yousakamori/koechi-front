export const endpoints = {
  signUp: '/users',
  login: '/login',
  logout: '/logout',
  currentUser: '/me',
  myLibraryLikes: '/me/library/likes',
  email: '/me/email',
  password: '/me/password',
  search: '/search',
  searchCount: '/search/count',
  usernameTaken: '/validators/users/username_taken',
  emailTaken: '/validators/users/email_taken',
  resetPassword: '/reset_password',
  checkToken: '/reset_password/check_token',
  comments: '/comments',
  autocompleteUsers: '/autocomplete/users',
  talks: '/talks',
  talksArchived: '/talks/archived',
  members: '/members',
  spaces: '/spaces',
  mySpaces: '/me/spaces',
  mySpacesName: '/me/spaces/name',
  notes: '/notes',
  myNotes: '/me/notes',
  notesTerm: '/me/notes/term',
  likes: '/likes',
  follow: '/follow',
  unfollow: '/unfollow',
  notifications: '/me/notifications',
  links: '/links',
  user: (username: string) => `/users/${username}`,
  userComments: (username: string) => `/users/${username}/comments`,
  comment: (slug: string) => `/comments/${slug}`,
  talk: (slug: string) => `/talks/${slug}`,
  space: (slug: string) => `/spaces/${slug}`,
  spaceMembers: (slug: string) => `/spaces/${slug}/members`,
  note: (slug: string) => `/notes/${slug}`,
  spaceNotes: (spaceSlug: string) => `/spaces/${spaceSlug}/notes`,
  editNote: (slug: string) => `/notes/${slug}/edit`,
};
