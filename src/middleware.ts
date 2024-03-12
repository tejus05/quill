import { withAuth } from '@kinde-oss/kinde-auth-nextjs/server';

export const config = {
  matcher: ['/dashboard/:path*', '/auth-callback'],
};

export default withAuth(async function middleware(req: any) { }, {
  isAuthorized: ({ user }: { user: any }) => {
    return user?.id; // Customize this condition as needed
  },
});
