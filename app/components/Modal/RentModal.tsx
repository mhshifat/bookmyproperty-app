"use client";
import { useRentModal } from "@/app/hooks";
import Modal from ".";
import { useCallback, useMemo, useState } from "react";
import { CategoryInput, Counter, CountrySelect, Heading, ImageUpload, Input } from "..";
import { categories } from "../Navbar/Categories";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CountrySelectValue } from "../CountrySelect";
import dynamic from "next/dynamic";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export default function RentModal() {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: "",
      description: "",
    }
  });
  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location])
  const setCustomValue = useCallback((property: string, value: string | number | CountrySelectValue) =>  {
    setValue(property, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [setValue])
  const onBack = useCallback(() =>  {
    setStep(value => value - 1);
  }, [])
  const onNext = useCallback(() =>  {
    setStep(value => value + 1);
  }, [])
  const onSubmit: SubmitHandler<FieldValues> = (data) =>  {
    if (step !== STEPS.PRICE) return onNext();
    setIsLoading(true);
    axios.post('/api/listings', data)
      .then(() => {
        toast.success('Listing created!')
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((err) => {
        toast.error('Something went wrong.')
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Rent your home!"
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={step === STEPS.PRICE ? 'Create' : 'Next'}
      secondaryActionLabel={step === STEPS.CATEGORY ? undefined : 'Back'}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={STEPS.CATEGORY === step ? (
        <div className="flex flex-col gap-8">
          <Heading
            title='Which of these best describes your place?'
            subtitle="Pick a category"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map(cat => (
              <div key={cat.label} className="col-span-1">
                <CategoryInput
                  onClick={(selectedCategory) => setCustomValue('category', selectedCategory)}
                  selected={category === cat.label}
                  {...cat}
                />
              </div>
            ))}
          </div>
        </div>
      ) : step === STEPS.LOCATION ? (
        <div className="flex flex-col gap-8">
          <Heading
            title='Where is your place located?'
            subtitle="Help guests find you!"
          />

          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue('location', value)}
          />

          <Map
            center={location?.latlng}
          />
        </div>
      ) : step === STEPS.INFO ? (
        <div className="flex flex-col gap-8">
          <Heading
            title='Share some basics about your place?'
            subtitle="What amenities do you have?"
          />

          <Counter
            title="Guests"
            subtitle="How many guests do you allow?"
            value={guestCount}
            onChange={(value) => setCustomValue('guestCount', value)}
          />
          <hr />
          <Counter
            title="Rooms"
            subtitle="How many rooms do you have?"
            value={roomCount}
            onChange={(value) => setCustomValue('roomCount', value)}
          />
          <hr />
          <Counter
            title="Bathrooms"
            subtitle="How many bathrooms do you have?"
            value={bathroomCount}
            onChange={(value) => setCustomValue('bathroomCount', value)}
          />
        </div>
      ) : step === STEPS.IMAGES ? (
        <div className="flex flex-col gap-8">
          <Heading
            title='Add a photo of your place'
            subtitle="Show your guests what your place looks like!"
          />

          <ImageUpload
            value={imageSrc}
            onChange={value => setCustomValue('imageSrc', value)}
          />
        </div>
      ) : step === STEPS.DESCRIPTION ? (
        <div className="flex flex-col gap-8">
          <Heading
            title='How would you describe your place?'
            subtitle="Short and sweet works best!"
          />

          <Input
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      ) : step === STEPS.PRICE ? (
        <div className="flex flex-col gap-8">
          <Heading
            title='Now, set your price'
            subtitle="How much do you charge per night?"
          />

          <Input
            id="price"
            label="Price"
            formatPrice
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      ) : (<></>)}
    />
  )
}