/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';

import { useUpdateCabin } from './useUpdateCabin';
import { useCreateCabin } from './useCreateCabin';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

function CreateCabinForm({ editCabin = {}, onCloseModal }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isEditing } = useUpdateCabin();

  // form
  const { id: editId, ...editValues } = editCabin;
  const isEditingSession = Boolean(editId);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditingSession ? editValues : {},
  });
  const { errors } = formState;

  // custom handler
  function onSubmit(data) {
    // check filelist or url
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    isEditingSession
      ? updateCabin(
          { ...data, image, id: editId },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          }
        )
      : createCabin(
          { ...data, image },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          }
        );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          disabled={isCreating || isEditing}
          type='text'
          id='name'
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          disabled={isCreating || isEditing}
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
          disabled={isCreating || isEditing}
          type='text'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          disabled={isCreating || isEditing}
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
          disabled={isCreating || isEditing}
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
            required: isEditingSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing}>
          {isEditingSession ? 'Edit Cabin' : 'Create Cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
