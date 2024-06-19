import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import dayjs from "dayjs";
import {LateCheckInValidationError} from "@/services/errors/late-check-in-validation-error";

interface ValidateCheckInUseCaseRequest {
   checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn;
}


export class ValidateCheckInUseCase {

    /**
     * Constructs a new instance of the class.
     *
     * @param {CheckInsRepository} checkinsRepository - The repository for check-ins.
     */
    constructor(
        private checkinsRepository: CheckInsRepository,
    ) {}

    /**
     * Executes the validation of a check-in.
     *
     * @param {ValidateCheckInUseCaseRequest} param - The request object containing the check-in ID.
     * @param {string} param.checkInId - The ID of the check-in to validate.
     * @return {Promise<ValidateCheckInUseCaseResponse>} A promise that resolves to the response object containing the validated check-in.
     * @throws {ResourceNotFoundError} If the check-in with the given ID is not found.
     */
    async execute({
      checkInId
    }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse>{
        const checkIn = await this.checkinsRepository.findById(checkInId);

        if(!checkIn) {
            throw new ResourceNotFoundError();
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes'
        );

        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new LateCheckInValidationError();

        }

        checkIn.validate_at = new Date();

        await this.checkinsRepository.save(checkIn);

        return {
            checkIn
        };
    }
}