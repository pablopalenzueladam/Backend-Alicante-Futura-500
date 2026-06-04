import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  findAll() {
    return this.reviewsRepository.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: number) {
    return this.reviewsRepository.findOneBy({ id });
  }

  create(createReviewDto: CreateReviewDto) {
    const review = this.reviewsRepository.create(createReviewDto);
    return this.reviewsRepository.save(review);
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewsRepository.findOneBy({ id });
    if (!review) throw new NotFoundException(`No existe la reseña con id ${id}`);
    const updated = this.reviewsRepository.merge(review, updateReviewDto);
    return this.reviewsRepository.save(updated);
  }

  async remove(id: number) {
    const review = await this.reviewsRepository.findOneBy({ id });
    if (!review) throw new NotFoundException(`No existe la reseña con id ${id}`);
    await this.reviewsRepository.remove(review);
    return { message: `Reseña ${id} eliminada correctamente` };
  }
}
