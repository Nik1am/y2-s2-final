import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Card } from '../atoms';
import type { User } from '../../types';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  className: z.string().optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  initialData?: User;
  onSubmit: (data: ProfileFormData) => Promise<void>;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      address: initialData?.address || '',
      className: initialData?.className || '',
    },
  });

  React.useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone || '',
        address: initialData.address || '',
        className: initialData.className || '',
      });
    }
  }, [initialData, reset]);

  return (
    <Card className="max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Name"
          type="text"
          {...register('name')}
          error={errors.name?.message}
          placeholder="Enter your full name"
        />

        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="Enter your email"
        />

        <Input
          label="Phone"
          type="tel"
          {...register('phone')}
          error={errors.phone?.message}
          placeholder="Enter your phone number"
        />

        <Input
          label="Address"
          type="text"
          {...register('address')}
          error={errors.address?.message}
          placeholder="Enter your address"
        />

        <Input
          label="Class"
          type="text"
          {...register('className')}
          error={errors.className?.message}
          placeholder="Enter your class"
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="w-full mt-6"
        >
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </Button>
      </form>
    </Card>
  );
};
