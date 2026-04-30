import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Page = async () => {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }

  const userSettings = await prisma.userSettings.findUnique({
    where: { userId: user.id },
  });
  if (!userSettings) {
    redirect('/wizard');
  }
  return (
    <div className="h-full bg-background">
      <div className="border-b bg-card">
        <div className="container flex flex-wrap justify-between items-center gap-6 py-8">
<p className='font-bold text-3xl'>Hello, {user.firstName}! 👋</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
