/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createCabin } from '../../services/apiCabins';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

function CreateCabinForm({ editCabin = {} }) {
  const { id: editId, ...editValues } = editCabin;
  const isEditing = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditing ? editValues : {},
  });
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin created');
      queryClient.invalidateQueries(['cabins']);
      reset();
    },
    onError: error => toast.error(error.message),
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          disabled={isCreating}
          type='text'
          id='name'
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          disabled={isCreating}
          type='text'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'The capacity should at least be 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          disabled={isCreating}
          type='text'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          disabled={isCreating}
          type='number'
          id='discount'
          // defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value, fieldValues) =>
              +value <= +fieldValues.regularPrice ||
              'Discount should not exceed the regular price',
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isCreating}
          type='number'
          id='description'
          defaultValue=''
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Create Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
