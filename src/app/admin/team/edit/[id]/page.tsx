
'use client';

import { useState, useEffect, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { TeamMemberForm, TeamMemberFormValues } from '../../team-member-form';

interface EditTeamMemberPageProps {
  params: Promise<{ id: string }>;
}

interface TeamMember extends TeamMemberFormValues {
    id: string;
}

function EditTeamMemberForm({ id }: { id: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const docRef = await getDoc(doc(db, 'team', id));
        if (docRef.exists()) {
          setMember({ id: docRef.id, ...docRef.data() } as TeamMember);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Error fetching team member:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  const handleSubmit = async (data: TeamMemberFormValues) => {
    try {
      const memberRef = doc(db, 'team', id);
      await updateDoc(memberRef, data);
      
      toast({
        title: 'Member Updated!',
        description: 'The team member\'s details have been saved successfully.',
      });

      router.push('/admin/team');
    } catch (error) {
      console.error("Error updating document: ", error);
      toast({
        title: 'Error',
        description: 'Failed to update team member. Please try again.',
        variant: 'destructive',
      });
    }
  };

   if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!member) {
    return notFound();
  }

  return (
     <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Edit Team Member</h2>
        </div>
        <TeamMemberForm onSubmit={handleSubmit} defaultValues={member} />
    </div>
  );
}


export default function EditTeamMemberPage({ params }: EditTeamMemberPageProps) {
  const { id } = use(params);
  return <EditTeamMemberForm id={id} />;
}
