<?php

namespace App\Services;

use App\User;
use App\Models\Filter;
use App\Models\Subscription;
use Illuminate\Support\Collection;
use App\Http\Requests\DTO\FilterDTO;
use App\Services\Requests\CreateSubscriptionsRequest;
use App\Repositories\Contracts\SubscriptionRepository;
use App\Services\Requests\Subscriptions\EditSubscriptionRequest;
use App\Services\Requests\Subscriptions\StatusSubscriptionRequest;

class SubscriptionsService implements Contracts\SubscriptionsService
{
    /**
     * @var SubscriptionRepository
     */
    private $subscriptionRepository;

    /**
     * SubscriptionsService constructor.
     *
     * @param SubscriptionRepository $subscriptionRepository
     */
    public function __construct(SubscriptionRepository $subscriptionRepository)
    {
        $this->subscriptionRepository = $subscriptionRepository;
    }

    /**
     * {@inheritdoc}
     */
    public function getByUser(User $user): Collection
    {
        return collect($this->subscriptionRepository->findByField('email', $user->email));
    }

    /**
     * {@inheritdoc}
     */
    public function changeStatus(StatusSubscriptionRequest $request, Subscription $subscription): void
    {
        $subscription->is_active = $request->isActive();

        $this->subscriptionRepository->save($subscription);
    }

    /**
     * {@inheritdoc}
     */
    public function edit(EditSubscriptionRequest $request, Subscription $subscription): Subscription
    {
        /** @var FilterDTO[] $filters */
        $newFilters = collect($request->getFilters());
        /** @var Collection $filters */
        $filters = $subscription->filters;

        $data = $newFilters->map(function (FilterDTO $filter) use ($filters) {
            $f = $filters->where('name', $filter->getName())->first();
            if ($f) {
                $f->parameters = $filter->getParams();
            } else {
                $f = new Filter;
                $f->name = $filter->getName();
                $f->parameters = $filter->getParams();
            }

            return $f;
        });

        return $this->subscriptionRepository->setFilters($subscription, ...$data);
    }

    /**
     * {@inheritdoc}
     */
    public function delete(Subscription $subscription): void
    {
        $this->subscriptionRepository->delete($subscription->id);
    }

    /**
     * {@inheritdoc}
     */
    public function create(CreateSubscriptionsRequest $request)
    {
        $subscriptionAttributes = [
            'start_at' => $request->getStartAt(),
            'from' => $request->getFrom(),
            'from_lat' => $request->getFromLat(),
            'from_lng' => $request->getFromLng(),
            'to' => $request->getTo(),
            'to_lat' => $request->getToLat(),
            'to_lng' => $request->getToLng(),
            'email' => $request->getEmail(),
            'is_active' => true,
        ];

        $subscription = $this->subscriptionRepository->save(new Subscription($subscriptionAttributes));

        foreach ($request->getFilters() as $filter) {
            $filterAttributes = [
                'name' => $filter->getName(),
                'parameters' => $filter->getParams(),
            ];
            $subscription->filters()->create($filterAttributes);
        }

        return $subscription;
    }
}
