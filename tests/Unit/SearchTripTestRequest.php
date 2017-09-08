<?php

namespace Tests\Unit;

use App\Services\Requests\SearchTripRequest as SearchTripRequestContract;
use Carbon\Carbon;

class SearchTripRequest implements SearchTripRequestContract
{
    public $fromLat;
    public $fromLng;
    public $toLat;
    public $toLng;

    /**
     * Latitude 'From' point.
     *
     * @return mixed
     */
    public function getFromLat(): float
    {
        return $this->fromLat;
    }

    /**
     * Longitude 'From' point.
     *
     * @return mixed
     */
    public function getFromLng(): float
    {
        return $this->fromLng;
    }

    /**
     * Latitude 'To' point.
     *
     * @return mixed
     */
    public function getToLat(): float
    {
        return $this->toLat;
    }

    /**
     * Longitude 'To' point.
     *
     * @return mixed
     */
    public function getToLng(): float
    {
        return $this->toLng;
    }

    /**
     * Date of start trip.
     *
     * @return Carbon
     */
    public function getStartAt(): Carbon
    {
        // TODO: Implement getStartAt() method.
    }

    /**
     * Limit items of page.
     *
     * @return int
     */
    public function getLimit(): int
    {
        // TODO: Implement getLimit() method.
    }

    /**
     * Page number.
     *
     * @return int
     */
    public function getPage(): int
    {
        // TODO: Implement getPage() method.
    }

    /**
     * Sort field.
     *
     * @return string
     */
    public function getSort(): string
    {
        // TODO: Implement getSort() method.
    }

    /**
     * Sort order.
     *
     * @return string
     */
    public function getOrder(): string
    {
        // TODO: Implement getOrder() method.
    }

    /**
     * Sort order ascending.
     *
     * @return bool
     */
    public function isAsc(): bool
    {
        // TODO: Implement isAsc() method.
    }

    /**
     * Sort order descending.
     *
     * @return bool
     */
    public function isDesc(): bool
    {
        // TODO: Implement isDesc() method.
    }

    /**
     * Get filter array.
     *
     * @return array
     */
    public function getFilter(): array
    {
        // TODO: Implement getFilter() method.
    }

    /**
     * @return int
     */
    public function getMinTime(): int
    {
        // TODO: Implement getMinTime() method.
    }

    /**
     * @return int
     */
    public function getMaxTime(): int
    {
        // TODO: Implement getMaxTime() method.
    }

    /**
     * @return int
     */
    public function getMinPrice(): int
    {
        // TODO: Implement getMinPrice() method.
    }

    /**
     * @return int
     */
    public function getMaxPrice(): int
    {
        // TODO: Implement getMaxPrice() method.
    }

    public function getIsAnimalsAllowed(): ?bool
    {
        // TODO: Implement getIsAnimalsAllowed() method.
    }

    public function getLuggageSize(): ?int
    {
        // TODO: Implement getLuggageSize() method.
    }

    public function getSeats(): ?int
    {
        // TODO: Implement getSeats() method.
    }

    public function getRating(): ?int
    {
        // TODO: Implement getRating() method.
    }
}