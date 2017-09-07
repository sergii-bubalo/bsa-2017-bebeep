<?php

namespace App\Http\Controllers\Api\Subscription;

use App\Http\Controllers\Controller;
use App\Services\SubscriptionsService;
use App\Http\Requests\CreateSubscriptionRequest;

class SubscriptionsController extends Controller
{
    /**
     * @var SubscriptionsService
     */
    private $subscriptionService;

    /**
     * SubscriptionsService constructor.
     *
     * @param SubscriptionsService $subscriptionService
     */
    public function __construct(SubscriptionsService $subscriptionService)
    {
        $this->subscriptionService = $subscriptionService;
    }

    /**
     * @param CreateSubscriptionRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateSubscriptionRequest $request)
    {
        $subscription = $this->subscriptionService->create($request);

        return response()->json($subscription);
    }
}
