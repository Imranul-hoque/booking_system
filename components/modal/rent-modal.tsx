"use client"

import { useRentModal } from "@/hooks/use-rent-modal";
import Modal from "./modal";
import { useMemo, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import dynamic from "next/dynamic";
import Heading from '@/components/ui/header'
import { categories } from "../category/categories";
import CategoryInput from "../category/category-input";
import { Button } from "../ui/button";
import CountrySelect from "../country-select";
import Counter from '@/components/counter';
import {ImageUpload} from '@/components/image-upload';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
 
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY);
    const rentModal = useRentModal();
  
     const router = useRouter();
    
    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
      reset,
    } = useForm<FieldValues>({
      defaultValues: {
        category: "",
        location: null,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: "",
        price: 1,
        title: "",
        description: "",
      },
    });

    const location = watch("location");
    const category = watch("category");
    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const imageSrc = watch("imageSrc");

    const Map = useMemo(
      () =>
        dynamic(() => import("../map"), {
          ssr: false,
        }),
      [location]
    );

    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    };

    const onBack = () => {
      setStep((value) => value - 1);
    };

    const onNext = () => {
      setStep((value) => value + 1);
    };

     const actionLabel = useMemo(() => {
       if (step === STEPS.PRICE) {
         return "Create";
       }

       return "Next";
     }, [step]);
    
 const onSubmit: SubmitHandler<FieldValues> = (data) => {
   if (step !== STEPS.PRICE) {
     return onNext();
   } 
    console.log(data)

   axios
     .post("/api/listings", data)
     .then(() => {
       toast.success("Listing created!");
       router.refresh();
       reset();
       setStep(STEPS.CATEGORY);
       rentModal.onClose();
     })
     .catch(() => {
       toast.error("Something went wrong.");
     })
     .finally(() => {
       setIsLoading(false);
     });
 };


     const secondaryActionLabel = useMemo(() => {
       if (step === STEPS.CATEGORY) {
         return undefined;
       }

       return "Back";
     }, [step]);
    
    let bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describes your place?"
          description="Pick a category"
        />
        <div
          className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
        >
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue("category", category)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );

    if (step === STEPS.LOCATION) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where is your place located?"
            description="Help guests find you!"
          />
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />
          <Map center={location?.latlng} />
        </div>
      );
    }

     if (step === STEPS.INFO) {
       bodyContent = (
         <div className="flex flex-col gap-8">
           <Heading
             title="Share some basics about your place"
             description="What amenitis do you have?"
           />
           <Counter
             onChange={(value) => setCustomValue("guestCount", value)}
             value={guestCount}
             title="Guests"
             subtitle="How many guests do you allow?"
           />
           <hr />
           <Counter
             onChange={(value) => setCustomValue("roomCount", value)}
             value={roomCount}
             title="Rooms"
             subtitle="How many rooms do you have?"
           />
           <hr />
           <Counter
             onChange={(value) => setCustomValue("bathroomCount", value)}
             value={bathroomCount}
             title="Bathrooms"
             subtitle="How many bathrooms do you have?"
           />
         </div>
       );
    }
    
    if (step === STEPS.IMAGES) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a photo of your place"
            description="Show guests what your place looks like!"
          />
          <ImageUpload
            onChange={(value: any) => setCustomValue("imageSrc", value)}
            value={imageSrc}
            endpoint="imageUpload"
          />
        </div>
      );
    }

      if (step === STEPS.DESCRIPTION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="How would you describe your place?"
              description="Short and sweet works best!"
            />
            <div className="flex flex-col space-y-3">
              <label className="block" htmlFor="title">
                Title
              </label>
              <Input
                id="title"
                placeholder="Title"
                disabled={isLoading}
                {...register("title", { required: true })}
                className={cn(
                  errors["title"] ? "border-rose-500" : "border-neutral-300",
                  errors["title"]
                    && "focus:border-rose-500",
                  "py-2 placeholder:text-neutral-300 outline-0 focus:outline-0"
                )}
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label className="block" htmlFor="title">
                Title
              </label>
              <Textarea
                id="description"
                placeholder="Description"
                disabled={isLoading}
                {...register("description", { required: true })}
                className={cn(
                  errors["description"] && "border-rose-500" ,
                  errors["description"]
                    && "focus:border-rose-500",
                  "py-2 placeholder:text-neutral-300 outline-0 focus:outline-0 ring-0 ring-offset-0"
                )}
              />
            </div>
          </div>
        );
    }
    
     if (step === STEPS.PRICE) {
       bodyContent = (
         <div className="flex flex-col gap-8">
           <Heading
             title="Now, set your price"
             description="How much do you charge per night?"
           />
           <div className="flex flex-col space-y-3 relative">
             <label className="block" htmlFor="price">
               Price
             </label>
             <Input
               id="price"
               placeholder="Price"
               disabled={isLoading}
               {...register("price", { required: true })}
               className={cn(
                 errors["price"] ? "border-rose-500" : "border-neutral-300",
                 errors["price"]
                   && "focus:border-rose-500",
                 "py-2 pl-6 placeholder:text-neutral-300 outline-0 focus:outline-0 ring-blue-500"
               )}
              />
                   <DollarSign className="absolute top-9 left-2 w-4 h-4 text-neutral-400"  />
           </div>
         </div>
       );
     }

    let footer = (
      <div className="flex items-center gap-x-3 w-full">
        {secondaryActionLabel && <Button onClick={onBack} variant={"destructive"} className="w-full focus:outline-none">{secondaryActionLabel}</Button>}
        <Button onClick={handleSubmit(onSubmit)} className="w-full focus:outline-none" variant={"destructive"}>{actionLabel}</Button>
      </div>
    );

    return ( 
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}  
            title="Airbnb your home"
            body={bodyContent}
            footer={footer}
        />
     );
}
 
export default RentModal;