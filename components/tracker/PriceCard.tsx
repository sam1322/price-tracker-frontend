/* eslint-disable */

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Clock, ShoppingBag, TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PriceCardProps {
  productId: string;
  title: string;
  currentPrice: number;
  vendor: string;
  lastUpdated: string;
  image?: string;
  productUrl: string;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    changePercent: number;
  };
}

export const PriceCard = ({
  // productId,
  title,
  currentPrice,
  vendor,
  lastUpdated,
  image,
  productUrl,
  trend
}: PriceCardProps) => {
  const getTrendColor = () => {
    if (!trend || trend.direction === 'stable') return 'muted';
    return trend.direction === 'up' ? 'destructive' : 'success';
  };

  const getTrendIcon = () => {
    if (!trend || trend.direction === 'stable') return null;
    return trend.direction === 'up' ? TrendingUp : TrendingDown;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const TrendIcon = getTrendIcon();

  return (
    <Link href={productUrl} target='_blank' >
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80">
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative h-48 overflow-hidden bg-white">
            {image ? (
              <Image
                width={400}
                height={400}
                src={image}
                alt={title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/60">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/40" />
              </div>
            )}

            {/* Vendor Badge */}
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className={cn("bg-background/90 backdrop-blur-sm capitalize", vendor.toLowerCase() === 'flipkart' ? "bg-blue-200" : "bg-yellow-200")}>
                {vendor.toLowerCase()}
              </Badge>
            </div>

            {/* Trend Badge */}
            {trend && trend.direction !== 'stable' && (
              <div className="absolute top-3 right-3">
                <Badge
                  variant={getTrendColor() as any}
                  className="bg-background/90 backdrop-blur-sm flex items-center gap-1"
                >
                  {TrendIcon && <TrendIcon className="w-3 h-3" />}
                  {trend.direction === 'up' ? '+' : '-'}{Math.abs(trend.changePercent).toFixed(1)}%
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <h3 className="font-semibold text-card-foreground line-clamp-2 leading-tight" title={title}>
              {title}
            </h3>

            {/* Price Section */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-card-foreground">
                  {formatPrice(currentPrice)}
                </span>
                {trend && trend.direction !== 'stable' && (
                  <span className={`text-sm font-medium ${trend.direction === 'up' ? 'text-price-up' : 'text-price-down'
                    }`}>
                    {trend.direction === 'up' ? '↗' : '↘'}
                  </span>
                )}
              </div>

              {/* Trend Details */}
              {trend && trend.direction !== 'stable' && (
                <div className={`flex items-center gap-1 text-sm ${trend.direction === 'up' ? 'text-price-up' : 'text-price-down'
                  }`}>
                  {TrendIcon && <TrendIcon className="w-4 h-4" />}
                  <span>
                    {trend.direction === 'up' ? 'Increased' : 'Decreased'} by {Math.abs(trend.changePercent).toFixed(2)}%
                  </span>
                </div>
              )}
            </div>

            {/* Last Updated */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border/50">
              <Clock className="w-3 h-3" />
              <span>Updated {new Date(lastUpdated).toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};