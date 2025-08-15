

'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { TeamMemberForm, TeamMemberFormValues } from '../team-member-form';

export default function NewTeamMemberPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: TeamMemberFormValues) => {
    try {
      await addDoc(collection(db, 'team'), data);
      
      toast({
        title: 'Member Added!',
        description: 'The new team member has been added successfully.',
      });

      router.push('/admin/team');
    } catch (error) {
        console.error("Error adding document: ", error);
        toast({
          title: 'Error',
          description: 'Failed to add team member. Please try again.',
          variant: 'destructive',
        });
    }
  };

  return (
     <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Add New Team Member</h2>
        </div>
        <TeamMemberForm onSubmit={handleSubmit} />
    </div>
  );
}
