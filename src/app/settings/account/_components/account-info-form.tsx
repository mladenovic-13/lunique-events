"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpIcon,
  GlobeIcon,
  LinkedinIcon,
  type LucideIcon,
  TwitterIcon,
  User2Icon,
  UserCheck2Icon,
  XIcon,
  YoutubeIcon,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useImageUpload } from "@/hooks/use-image-upload";
import { getProfileImagePath } from "@/lib/get-path";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import {
  type AccountInfoSchema,
  accountInfoSchema,
  defaultValues,
} from "@/validation/account-info";

export const AccountInfoForm = () => {
  const form = useForm({
    resolver: zodResolver(accountInfoSchema),
    defaultValues: defaultValues,
  });

  const { data: account } = api.account.get.useQuery();
  const { mutate: saveChanges, isLoading: savingChanges } =
    api.account.update.useMutation();
  const utils = api.useUtils();
  const { toast } = useToast();

  useEffect(() => {
    if (account && !form.formState.isDirty) {
      form.reset({
        name: account.name ?? undefined,
        bio: account.bio ?? undefined,
        profileImageUrl: account.image ?? undefined,
        linkedinUrl: account.socialLinks?.linkedin ?? undefined,
        websiteUrl: account.socialLinks?.website ?? undefined,
        xUrl: account.socialLinks?.twitter ?? undefined,
        youtubeUrl: account.socialLinks?.youtue ?? undefined,
      });
    }
  }, [account, form]);

  const socialLinkInputs: {
    name: keyof AccountInfoSchema;
    label: string;
    icon: LucideIcon;
    placeholder: string;
  }[] = [
    {
      name: "websiteUrl",
      label: "Website",
      icon: GlobeIcon,
      placeholder: "https://www.website.com",
    },
    {
      name: "xUrl",
      label: "X/Twitter",
      icon: TwitterIcon,
      placeholder: "https://www.x.com/username",
    },
    {
      name: "linkedinUrl",
      label: "LinkedIn",
      icon: LinkedinIcon,
      placeholder: "https://www.linkedin.com/in/handle",
    },
    {
      name: "youtubeUrl",
      label: "YouTube",
      icon: YoutubeIcon,
      placeholder: "https://www.youtube.com/username",
    },
  ];

  const onSubmit = (values: AccountInfoSchema) => {
    saveChanges(values, {
      onSuccess: () => {
        toast({ title: "Account succesfully updated" });
        utils.account.get.invalidate().catch((err) => console.log(err));
      },
      onError: () => {
        toast({ variant: "destructive", title: "Failed to save changes" });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className=" space-y-3">
          <div className="flex flex-col space-y-3 md:flex-row-reverse md:gap-5 md:space-y-0">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="profileImageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <ProfileImageInput
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1 space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your display name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share a little about your background and interests."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:grid-rows-2 md:gap-x-5">
            {socialLinkInputs.map((item) => (
              <FormField
                key={item.name}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <SocialLinkInput
                        value={field.value}
                        onChange={field.onChange}
                        Icon={item.icon}
                        placeholder={item.placeholder}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <Button disabled={savingChanges} className="w-full md:w-fit">
          <UserCheck2Icon className="mr-1.5 size-4" /> Save Changes
        </Button>
      </form>
    </Form>
  );
};

const ProfileImageInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string | null) => void;
}) => {
  const { file, setFile, getInputProps, getRootProps } = useImageUpload({
    pathFormatter: getProfileImagePath,
    onSuccess: (url) => onChange(url),
    onError: () => onChange(null),
  });

  const handleDelete = () => {
    setFile(null);
    onChange(null);
  };

  return value ? (
    <div className=" p-5">
      <div className="relative size-28">
        <Image
          src={file ? URL.createObjectURL(file) : value}
          alt=""
          width={112}
          height={112}
          className="size-28 rounded-full object-cover"
        />
        <button
          type="button"
          className="absolute bottom-0 right-0 rounded-full bg-destructive p-1 transition duration-200 hover:scale-110"
          onClick={handleDelete}
        >
          <XIcon className="size-5 text-destructive-foreground" />
        </button>
      </div>
    </div>
  ) : (
    <div
      {...getRootProps()}
      className="group relative w-fit cursor-pointer p-5"
    >
      <input {...getInputProps()} />

      <div className="relative flex size-28 items-center justify-center rounded-full border-4 border-muted p-3">
        <User2Icon className="size-16 text-muted" />
        <button
          type="button"
          className="absolute bottom-0 right-0 rounded-full bg-accent-foreground p-1 transition duration-200 group-hover:scale-110 group-hover:bg-primary"
        >
          <ArrowUpIcon className="size-5 text-accent transition duration-200 group-hover:text-primary-foreground" />
        </button>
      </div>
    </div>
  );
};

const SocialLinkInput = ({
  Icon,
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  Icon: LucideIcon;
  placeholder: string;
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        className="pl-8"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="absolute inset-y-0 left-0 flex h-9 w-8 items-center justify-center">
        <Icon
          className={cn(
            "size-4 text-muted-foreground",
            isActive && "text-ring transition duration-200",
          )}
        />
      </div>
    </div>
  );
};
