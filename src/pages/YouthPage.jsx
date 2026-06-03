import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/ui/button";
import HeroPanel from "../components/youth/HeroPanel";
import PersonalProfileFields from "../components/youth/PersonalProfileFields";
import EducationReadinessFields from "../components/youth/EducationReadinessFields";
import WorkHistoryFields from "../components/youth/WorkHistoryFields";
import SkillsFocusFields from "../components/youth/SkillsFocusFields";
import ServerStatusAlert from "../components/youth/ServerStatusAlert";
import youthService from "../services/youthService";
import {
  YOUTH_EXPERIENCE_FIELDS,
  formatYouthPayload,
  youthDefaultValues,
  youthFormSchema,
} from "../utils/youthForm";
import { focusTracks, highlightStats } from "../utils/youthHelpers";

const personalStepFields = [
  "name",
  "phone_number",
  "date_of_birth",
  "national_id",
  "home_town",
  "residential_community",
];

const educationStepFields = [
  "shs_qualification",
  "certificate_qualification",
  "diploma_qualification",
  "first_degree",
  "postgraduate_qualification",
  "professional_qualification",
  "jhs_completed",
  "salary_expectation",
];

const workStepFields = [
  "employment_status",
  "availability_status",
  "current_employment",
  ...YOUTH_EXPERIENCE_FIELDS,
  "employment_notes",
];

const skillsStepFields = [
  "skills",
  "interests",
  "preferred_work_location",
];

export default function YouthPage() {
  const [serverStatus, setServerStatus] = useState({ type: null, message: "" });
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(youthFormSchema),
    defaultValues: youthDefaultValues,
    mode: "onBlur",
  });

  const employmentStatus = watch("employment_status");

  const formSteps = useMemo(
    () => [
      {
        id: "personal",
        label: "Personal info",
        description: "Confirm your identity and contacts",
        fields: personalStepFields,
        content: <PersonalProfileFields register={register} errors={errors} />,
      },
      {
        id: "education",
        label: "Education",
        description: "Tell us your academic milestones",
        fields: educationStepFields,
        content: <EducationReadinessFields register={register} errors={errors} />,
      },
      {
        id: "work",
        label: "Experience",
        description: "Share roles and availability",
        fields: workStepFields,
        content: (
          <WorkHistoryFields
            register={register}
            errors={errors}
            employmentStatus={employmentStatus}
            experienceFields={YOUTH_EXPERIENCE_FIELDS}
          />
        ),
      },
      {
        id: "skills",
        label: "Skills & focus",
        description: "Highlight strengths and preferred placements",
        fields: skillsStepFields,
        content: <SkillsFocusFields register={register} errors={errors} />,
      },
    ],
    [register, errors, employmentStatus]
  );

  const stepProgress = Math.round(((currentStep + 1) / formSteps.length) * 100);
  const isLastStep = currentStep === formSteps.length - 1;

  async function handleNextStep() {
    const isValid = await trigger(formSteps[currentStep].fields);
    if (!isValid) return;
    setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1));
  }

  function handlePrevStep() {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }

  function handleStepSelect(index) {
    if (index > currentStep) return;
    setCurrentStep(index);
  }

  async function onSubmit(values) {
    setServerStatus({ type: null, message: "" });

    try {
      await youthService.submitYouthRegistration(formatYouthPayload(values));
      reset(youthDefaultValues);
      setCurrentStep(0);
      setServerStatus({
        type: "success",
        message:
          "Submission received. Our employment desk will reach out with opportunities that match you.",
      });
    } catch (error) {
      setServerStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-surface to-background text-text-primary">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-primarySoft/20 blur-[150px]" />
      </div>

      <main className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <HeroPanel stats={highlightStats} tracks={focusTracks} />

        <section className="rounded-3xl border border-border bg-surface/95 p-6 shadow-2xl">
          <div className="mb-6 space-y-4">
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                *
              </div>
              <div>
                <p className="font-semibold text-text-primary">Youth registration card</p>
                <p className="text-xs">Guided flow with real-time validation</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
                  Step {currentStep + 1} of {formSteps.length}
                </p>
                <p className="text-xl font-semibold text-text-primary">
                  {formSteps[currentStep].label}
                </p>
                <p className="text-sm text-text-muted">
                  {formSteps[currentStep].description}
                </p>
              </div>
              <p className="text-sm font-semibold text-primary">
                {stepProgress}% complete
              </p>
            </div>
          </div>

          <div className="my-8 h-2 w-full rounded-full bg-background">
            <span
              className="block h-2 rounded-full bg-primary"
              style={{ width: `${stepProgress}%` }}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {formSteps.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => handleStepSelect(index)}
                disabled={index > currentStep}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  index === currentStep
                    ? "border-primary bg-primary/10 text-text-primary"
                    : index < currentStep
                    ? "border-border bg-surface text-text-primary"
                    : "border-border bg-background text-text-muted"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide">
                  Step {index + 1}
                </p>
                <p className="text-sm font-medium">{step.label}</p>
                <p className="text-xs text-text-muted">{step.description}</p>
              </button>
            ))}
          </div>
        </section>

        <ServerStatusAlert status={serverStatus} />

        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-6">{formSteps[currentStep].content}</div>

          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-text-muted">
              By submitting you consent to follow-up via SMS, call or email.
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-border"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              )}

              {isLastStep ? (
                <Button
                  type="submit"
                  className="rounded-full px-6 py-3 text-base font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit registration"}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  className="rounded-full px-6 py-3 text-base font-semibold"
                  onClick={handleNextStep}
                  disabled={isSubmitting}
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
