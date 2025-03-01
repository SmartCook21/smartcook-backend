import vine from '@vinejs/vine'

export const patchUserValidator = vine.compile(
  vine.object({
    addressLine1: vine.string().optional(),
    addressLine2: vine.string().optional(),
    city: vine.string().optional(),
    postalCode: vine.string().optional(),
    currency: vine.string().optional(),
    newsletter: vine.boolean().optional(),
    payout: vine
      .object({
        iban: vine.string().optional(),
        bic: vine.string().optional(),
        country: vine.string().optional(),
        currency: vine.string().optional(),
        title: vine.string().optional(),
      })
      .optional(),
  })
)
