'use client';

import { useFormContext } from 'react-hook-form';

import { Combobox } from '@/components/combobox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { countries } from '@/lib/countries';
import { type UserAccountSettingFieldValues } from '@/lib/schemas/user-setting.schema';

import { UserSettingContent, UserSettingGroup, UserSettingHeader } from './user-setting';

export const PersonalInfoSettingArea = () => {
  const form = useFormContext<UserAccountSettingFieldValues>();

  return (
    <UserSettingGroup>
      <UserSettingHeader
        title='Personal Information'
        description='Use a permanent address where you can receive mail.'
      />
      <UserSettingContent>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem className='sm:col-span-3'>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem className='sm:col-span-3'>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='col-span-full'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='country'
          render={({ field }) => (
            <FormItem className='flex flex-col sm:col-span-3'>
              <FormLabel>Country</FormLabel>
              <Combobox
                options={countries}
                name={field.name}
                value={field.value}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem className='col-span-full'>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name='country'
          render={({ field }) => (
            <FormItem className='sm:col-span-4'>
              <FormLabel>Country</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a country' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem
                      key={country.value}
                      value={country.value}
                    >
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </UserSettingContent>
    </UserSettingGroup>
  );
};
