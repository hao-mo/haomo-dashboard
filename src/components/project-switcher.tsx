'use client';

import { BoxIcon, Check, ChevronsUpDown, PlusCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useProjectModal } from '@/hooks/use-project-modal';

import { cn } from '@/utils';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface ProjectSwitcherProps extends PopoverTriggerProps {
  items: Record<string, any>[];
}

export default function ProjectSwitcher({ className, items = [] }: ProjectSwitcherProps) {
  const projectModal = useProjectModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentProject = formattedItems.find((item) => item.value === params.projectId);

  const [open, setOpen] = React.useState(false);

  const onProjectSelect = (project: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/project/${project.value}`);
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          aria-expanded={open}
          aria-label='Select a project'
          className={cn('w-[200px] justify-between', className)}
        >
          <BoxIcon className='mr-2 size-4' />
          {currentProject?.label}
          <ChevronsUpDown className='ml-auto size-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search project...' />
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup heading='Projects'>
              {formattedItems.map((project) => (
                <CommandItem
                  key={project.value}
                  onSelect={() => onProjectSelect(project)}
                  className='text-sm'
                >
                  <BoxIcon className='mr-2 size-4' />
                  {project.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentProject?.value === project.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  projectModal.onOpen();
                }}
              >
                <PlusCircle className='mr-2 size-5' />
                Create Project
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
