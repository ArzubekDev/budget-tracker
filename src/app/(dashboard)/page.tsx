import { Button } from '@/components/ui/button';
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
          <p className="font-bold text-3xl">Hello, {user.firstName}! 👋</p>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              className="border-emerald-500 bg-emerald-950 text-white rounded-md cursor-pointer hover:bg-emerald-800"
            >
              New income 🤑
            </Button>
            <Button
              variant="secondary"
              className="border-rose-500 bg-rose-950 text-white rounded-md cursor-pointer hover:bg-rose-800"
            >
              New expense 😤
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
