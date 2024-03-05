import { service } from '@awesome/shared/utils/service';
import {
  Avatar,
  Body1,
  Button,
  Caption1,
  Card,
  CardHeader,
  Combobox,
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Option,
} from '@fluentui/react-components';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Delete20Regular, Search20Regular } from '@fluentui/react-icons';
import { debounce } from 'lodash-es';

export type AddRemoveMembersToProjectProps = {
  projectId: string;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialValues?: any;
};

const AddRemoveMembersToProject: React.FC<AddRemoveMembersToProjectProps> = ({
  dialogOpen,
  projectId,
  setDialogOpen,
  initialValues,
}) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchOptions, setSearchOptions] = useState<User[]>([]);
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);

  const getProjectDetails = async () => {
    if (isNaN(Number(projectId))) return;
    const { data } = await service('/api/projects/get', { method: 'POST' })({
      data: {
        searchCriteria: { id: Number(projectId) },
        populate: ['Members'],
      },
    });
    setProjectDetails(data);
  };

  const removeMember = async (projectMember: User) => {
    if (isNaN(Number(projectId))) return;
    const { data } = await service('/api/projects/update', { method: 'POST' })({
      data: {
        resourceIndex: {},
        searchCriteria: { id: Number(projectId) },
        update: {
          ...projectDetails,
          members: projectDetails?.members
            ?.filter((member) => member.id !== projectMember.id)
            .map((t) => t.id),
        },
      },
    });
    console.log(data);
  };

  const addMember = async (projectMember: User) => {
    if (isNaN(Number(projectId))) return;
    const { data } = await service('/api/projects/update', {
      method: 'POST',
    })({
      data: {
        resourceIndex: {},
        searchCriteria: { id: Number(projectId) },
        update: {
          ...projectDetails,
          members: [...(projectDetails?.members || []), projectMember].map(
            (t) => t.id
          ),
        },
      },
    });
    console.log(data);
  };

  const searchUsers = useCallback(
    debounce(async (value) => {
      const { data } = await service<User[]>('/api/auth/users/search', {
        method: 'POST',
      })({ data: { text: value } });
      setSearchOptions(data);
    }, 300),
    []
  );

  const onSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    searchUsers(e.target.value);
  };

  const onOptionClick = (userId: string) => {
    const user = searchOptions.find((user) => user.id === Number(userId));
    if (!user) {
      console.log('No such user found');
      return;
    }
    addMember(user);
  };

  useEffect(() => {
    getProjectDetails().catch(console.log);
  }, []);

  if (!projectDetails) return null;

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(_, { open }) => setDialogOpen(open)}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Add or Remove Project Members</DialogTitle>

          <DialogContent>
            <div className='flex flex-col gap-2 overflow-auto max-h-[500px]'>
              {(projectDetails?.members || []).map((projectMember) => {
                return (
                  <Card key={projectMember.id}>
                    <CardHeader
                      image={<Avatar className='cursor-pointer' />}
                      header={
                        <div className='flex justify-between w-full'>
                          <div className='flex flex-col'>
                            <Body1>
                              <b className='cursor-pointer'>
                                {projectMember.name}
                              </b>
                              &nbsp;&#x2022;&nbsp; Joined &nbsp;
                              {dayjs(projectMember.createdAt).fromNow()}
                            </Body1>
                            <Caption1>{projectMember.email}</Caption1>
                          </div>
                          <Button
                            disabled={
                              projectMember.id === projectDetails.projectOwnerId
                            }
                            icon={<Delete20Regular />}
                            onClick={() => removeMember(projectMember)}
                          />
                        </div>
                      }
                    />
                  </Card>
                );
              })}

              <Combobox
                value={searchText}
                placeholder='Search Users'
                onChange={onSearchTextChange}
                expandIcon={<Search20Regular />}
                onOptionSelect={(_, data) =>
                  onOptionClick(data.optionValue || '')
                }
              >
                {searchOptions.map((user) => (
                  <Option key={user.id} value={user.id.toString()}>
                    {user.name}
                  </Option>
                ))}
              </Combobox>
            </div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default AddRemoveMembersToProject;
