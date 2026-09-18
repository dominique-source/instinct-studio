"use server";

export type InquiryState = {
  status: "idle" | "success" | "error" | "no-endpoint";
  message?: string;
};

// Server-only. Set CONTACT_FORM_ENDPOINT in your deployment environment
// (never NEXT_PUBLIC_) once a real intake destination exists. See README.
export async function submitInquiry(
  _prevState: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;

  if (!endpoint) {
    return {
      status: "no-endpoint",
      message: "No intake endpoint is configured yet.",
    };
  }

  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Endpoint responded with ${response.status}`);
    }

    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try email instead.",
    };
  }
}
